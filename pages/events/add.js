import {parseCookie} from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'
 
import {DatePicker} from "react-advance-jalaali-datepicker";
import moment from 'jalali-moment'

//  npm i ract-toastify for alarm

// npm i slugify in backend (strapi) for autmat generation of slug-- then modify model folder of events (events.js)

export default function AddEventPage
({token}) {
    
    const currentDate=()=>{
        const date=new Date()
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth()+1).toString();
        const dd  = date.getDate().toString();
        const mmChars = mm.split('');
        const ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }
     
    const [values, setValues]=useState({
        name:'',
        performers:'',
        venue:'',
        address:'',
        date:currentDate(),
        time:'',
        description:'',
    })
    const router=useRouter()
    const    handleSubmit= async (e)=>{
        e.preventDefault()
        const hasEmptyFields=Object.values(values).some((element)=>element==='')
        if(hasEmptyFields){
           toast.error("لظفاً تمام گزینه‌ها تکمیل کنید")
        }
        else {
            const res=await fetch(`${API_URL}/events`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(values)
            })
    
            if(!res.ok){
                if(res.status===403 || res.status===401){
                    toast.error('دسترسی ندارید!')
                    return
                }
                toast.error('مشکلی به وجود آمده است!')
            }
            else{
                const evt=await res.json()
                router.push(`/events/${evt.slug}`)
            }
        }
 
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setValues({...values, [name]:value})
    }

    const DatePickerInput=(props)=>{
        return <input  {...props} ></input>;
    }



    const changeDate=(unix, formatted)=>{
        // const dateConvert = new Date(unix*1000);
        // const date=convertJalaali(dateConvert)
        const date=moment.from(formatted, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
        setValues({...values, date})
    }

    return (
        <Layout title={'درخواست پشتیبانی'}>
            <Link href="/events">بازگشت</Link>
            <h1>ثبت درخواست</h1>
            <ToastContainer bodyClassName="leftshow"/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                <div>
                    <label htmlFor='name'>عنوان</label>
                    <input
                    type='text'
                    id='name'
                    name='name'
                    value={values.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='performers'>ثبت کننده</label>
                    <input
                    type='text'
                    name='performers'
                    id='performers'
                    value={values.performers}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='venue'>کلید واژه</label>
                    <input
                    type='text'
                    name='venue'
                    id='venue'
                    value={values.venue}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='address'>آدرس</label>
                    <input
                    type='text'
                    name='address'
                    id='address'
                    value={values.address}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='date'>تاریخ</label>
                    {/* <input
                    type='date'
                    name='date'
                    id='date'
                    value={values.date}
                    onChange={handleInputChange}
                    /> */}
                    <DatePicker
					inputComponent={DatePickerInput}
					format="jYYYY/jMM/jDD"
					onChange={changeDate}
					id="datePicker"
					preSelected={moment().format('jYYYY/jMM/jDD')}
					/>
                </div>

                <div>
                    <label htmlFor='time'>زمان</label>
                    <input
                    type='text'
                    name='time'
                    id='time'
                    value={values.time}
                    onChange={handleInputChange}
                    />
                </div>
                </div>

                 <div>
                    <label htmlFor='description'>شرح مطلب</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <input type='submit' value='ثبت' className='btn' />
            </form>
        </Layout>
    )
}


export async function getServerSideProps({req}){
    const {token}=parseCookie(req)

    return {
        props:{
            token
        }
    }
}