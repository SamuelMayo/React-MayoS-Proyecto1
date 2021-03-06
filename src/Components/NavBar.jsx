import { height } from '@mui/system'
import logo from '../icons-imgs/logo.png'
import CartWidget from './CartWidget'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'



const NavBar =() =>{

    const [categories, setCategories]= useState([])

    useEffect(()=>{

        async function categoriesPromise(){
            try{
                const response = await fetch('https://api.escuelajs.co/api/v1/categories')
                const result = await response.json();
                setCategories(result)
            }
            catch(err){
                console.log(err);
            }
        }
        categoriesPromise()
    }, [])


    return(
        <header style={styles.container}>
            <div style={styles.titleCont}>
                <Link to="/"><img style={styles.imgLogo} src={logo} alt="Logo" /></Link>
                <h1 style={styles.h1Logo}>VendeLoTuyo.com</h1>
            </div>
            <nav style={styles.navCont}>
                {categories.map((category)=>{
                    return <Link key={category.id} style={styles.a} to={`/category/${category.id}`}>{category.name}</Link>
                })}
            </nav>

            <Link to="/cart" ><CartWidget /></Link>

        </header>
    )
}

export default NavBar

const styles ={
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "0px 30px 0px 30px",
        borderBottom:'2px solid lightGray',
        width:'100%',
        height:'80px',
        marginBottom:'25px',
        overflow:"hidden",
    },
    titleCont:{
        display: 'flex',
        alignItems: 'center',
    },
    imgLogo:{
        width: '150px',
    },
    h1Logo:{
        fontSize:'25px',
        fontWeight:'bold',
    },
    navCont:{
        width: "500px" ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    a:{
        color: 'black',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold'

    }
}