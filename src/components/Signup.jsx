import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()

    const create = async(data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100px'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account? :
                <Link
                    to='/login'
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='mt-2 text-center text-base text-red-600'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                    label='Full Name:'
                    placeholder='Enter your full name'
                    {...register('name',{
                        required:true
                    })}
                    />
                    <Input label='Email: ' placeholder='Enter your email' type='email'
                    {...register('email',{
                        required:true,
                        validate: {
                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || 'Email is not valid'
                        }
                    })}
                    />
                    <Input label='Password' placeholder='Enter your password' type='password'
                    {...register('password',{
                        required:true
                    })}
                    />
                    <Button type='submit' className='w-full'>Create Account</Button>
                </div>
            </form>
    </div>
  )
}

export default Signup