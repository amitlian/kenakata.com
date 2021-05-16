import React,{useState,useEffect,useContext} from 'react';
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core';
import {ContextShare} from '../ContextShare'
import {useForm,FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField'
import { commerce } from '../lib/commerce'
import {Link} from 'react-router-dom';

function AddressForm({next}) {
    const {checkoutToken} = useContext(ContextShare)
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}))
    const options = shippingOptions.map((shipOption)=>({id:shipOption.id,label:`${shipOption.description} - (${shipOption.price.formatted_with_symbol})`}))


    const fetchShippingCountries = async(checkoutTokenId)=>{
            const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setShippingCountries(countries)
            setShippingCountry(Object.keys(countries)[0])

    }

    const fetchSubdivisions = async(countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])

    }

    const fetchShippingOptions = async(checkoutTokenId,country,region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
        console.log("OP=====>",options)
        setShippingOptions(options)
        setShippingOption(options[0].id)

    }

    console.log("CheckOutToken========>",checkoutToken)
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if(shippingCountry){
            fetchSubdivisions(shippingCountry)
        }
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivision){
            fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
        }
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry ,shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First name'/>
                        <FormInput name='lastName' label='Last name'/>
                        <FormInput name='address' label='Address'/>
                        <FormInput name='email' label='Email'/>
                        <FormInput name='city' label='City'/>
                        <FormInput name='zip' label='ZIP/ Postal Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                            {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                </MenuItem> 
                            ))}
                            </Select>

                        </Grid>
    {/* ////////////////////////////////////////////////////gap/////////////////////////////////////////// */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                            {subdivisions.map((Subdivision)=>(
                                <MenuItem key={Subdivision.id} value={Subdivision.id}>
                                        {Subdivision.label}
                                </MenuItem> 
                            ))}
                            </Select>

                        </Grid>
    {/* ////////////////////////////////////////////////////gap/////////////////////////////////////////// */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                            {options.map((option)=>(
                                <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                </MenuItem> 
                            ))}
                            </Select>

                        </Grid> 
                    </Grid>
                    <br/>
                    <div style={{display:'flex' , justifyContent:'space-between'}}>
                        <Link to="/cart">
                            <Button variant="outlined">Back To Cart</Button>
                        </Link>
                        <Button type="submit" color="primary" variant="contained">Next</Button>
                    </div>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
