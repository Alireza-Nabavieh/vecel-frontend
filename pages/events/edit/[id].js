 
import {parseCookie} from '@/helpers/index'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

import {DatePicker} from "react-advance-jalaali-datepicker";
import moment from 'jalali-moment'

export default function EditEventPage({ evt,token }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized')
        return
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const changeDate=(unix, formatted)=>{
    // const dateConvert = new Date(unix*1000);
    // const date=convertJalaali(dateConvert)
    const date=moment.from(formatted, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
      setValues({...values, date})
  }

  const imageUploaded=async (e)=>{
      const res =await fetch(`${API_URL}/events/${evt.id}`)
      const data= await res.json()

      setImagePreview(data.image.formats.thumbnail.url)
      setShowModal(false)
  }

  const DatePickerInput=(props)=>{
    return <input  {...props} ></input>;
  }

 
  return (
    <Layout title='مشاهده و ویرایش'>
      <Link href='/events'>بازگشت</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
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
                value={moment(values.date).format('yyyy-MM-DD')}
                onChange={handleInputChange}
              /> */}

            <DatePicker
            inputComponent={DatePickerInput}
            format="jYYYY/jMM/jDD"
            onChange={changeDate}
            id="datePicker"
            preSelected={moment(values.date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}
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

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>تصویر</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className='btn-secondary btn-icon'
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
         <ImageUpload token={token} evtId={evt.id} imageUploaded={imageUploaded}/>
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id } , req }) {
 
  const {token}=parseCookie(req)

  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt,
      token
    },
  }
}

 