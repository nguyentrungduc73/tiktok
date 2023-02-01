import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { AppleIcon, GooGleIcon, InstagramIcon, LineIcon, TitterIcon } from '../../../Icons/Icons'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='mt-[80px] w-full'>
      <div className='mx-auto w-[375px]'>
        <h1 className='my-4 text-center text-[32px] font-bold text-[#161823] '>Sign up to Tiktok</h1>
        <p className='mb-8 text-center text-fontSizeName text-[#16182357]'>
          Create a profile, follow other accounts, make your own videos, and more.
        </p>
        <div className='flex flex-col gap-4'>
          <Link
            className='relative flex items-center justify-center border border-[#1618231f] p-3'
            to={'/signup/email'}
          >
            <FontAwesomeIcon icon={faUser} className='absolute left-3 text-[20px]' />
            <p className='font-sans text-fontSizeName font-semibold'>Use Phone / email / username</p>
          </Link>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <FontAwesomeIcon icon={faFacebook} className='absolute left-3 text-[20px] text-blue-600' />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with Facebook</p>
          </div>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <GooGleIcon style={{ position: 'absolute', left: '12px', fontSize: '20px' }} />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with Google</p>
          </div>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <TitterIcon style={{ position: 'absolute', left: '12px', fontSize: '20px' }} />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with Twitter</p>
          </div>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <LineIcon style={{ position: 'absolute', left: '12px', fontSize: '20px' }} />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with LINE</p>
          </div>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <InstagramIcon style={{ position: 'absolute', left: '12px', fontSize: '20px' }} />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with Instagram</p>
          </div>
          <div className='relative flex items-center justify-center border border-[#1618231f] p-3'>
            <AppleIcon style={{ position: 'absolute', left: '12px', fontSize: '20px' }} />
            <p className='font-sans text-fontSizeName font-semibold'>Continue with Apple</p>
          </div>
          <div className='h-[200px]'></div>
        </div>
      </div>
      <div className='fixed bottom-0  right-1  mx-auto flex w-full flex-col border-[#f1f1f2]'>
        <div className='flex w-full items-center justify-center bg-white px-[30px] py-4 text-fontSizeName'>
          <p className='w-[375px] text-center text-fontSizeMin text-[#16182380]'>
            By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy
            Policy.
          </p>
        </div>
        <div className='flex h-16 w-full items-center justify-center border-t bg-white text-fontSizeName'>
          Already have an account?
          <Link to={'/login'}>
            <span className='ml-1 inline-block font-medium text-tiktokPink hover:underline'> Log in</span>
          </Link>
        </div>
        <div className='flex h-[84px] cursor-pointer items-center justify-between bg-black px-[144px] text-white'>
          <div className='flex h-[36px] w-[172px] items-center rounded-sm border border-[#8a8b91] px-4 text-fontSizeTitle '>
            English
          </div>
          <span className='text-fontSizeTitle font-medium text-[#8a8b91]'>© 2023 TikTok</span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
