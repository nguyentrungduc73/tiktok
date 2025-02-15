import React from 'react'
import { Link } from 'react-router-dom'
import { formatNumberFollow, formatNumberLike } from '../../../assets/formatNumber'
import { ImgBasic } from '../../../assets/img'
import ButtonFollow from '../buttonFollow/ButtonFollow'

export default function UserPreviewDetailVideo({ data, uuidVideo }) {
  const loginId = JSON.parse(localStorage.getItem('userInfo')).id
  return (
    <>
      <div className='z-10 w-[290px] rounded-[6px] border bg-white p-5 shadow-xl'>
        <div className='flex items-center justify-between pb-4'>
          <Link to={`users/@${data?.nickname}`}>
            <div className='h-[40px] w-[40px] overflow-hidden rounded-full'>
              <img className='h-full w-full object-cover' src={ImgBasic(data?.avatar)} alt={data?.nickname} />
            </div>
          </Link>
          <div className=''>
            {loginId !== data.id ? (
              <ButtonFollow
                style={`h-fit cursor-pointer rounded-[4px] border ${
                  data?.is_followed ? 'border-[#1618231f]' : 'border-[rgba(254,44,85,1)]'
                } bg-white px-5 py-1 font-medium ${
                  data?.is_followed ? 'text-[#161823]' : 'text-[#fe2c55]'
                } hover:bg-[#FFF2F5]`}
                idUserFollow={data?.id}
                isFollowed={data?.is_followed}
                uuidVideo={uuidVideo}
              />
            ) : null}
          </div>
        </div>
        <div className='flex items-center'>
          <h2 className='text-[20px] font-bold'>{data?.nickname}</h2>
          {data?.tick && (
            <div className='ml-2'>
              <svg
                className='tiktok-shsbhf-StyledVerifyBadge e1aglo370'
                width='14'
                data-e2e=''
                height='14'
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='24' cy='24' r='24' fill='#20D5EC'></circle>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z'
                  fill='white'
                ></path>
              </svg>
            </div>
          )}
        </div>
        <h4 className='mt-1 text-sm font-medium'>{`${data?.first_name} ${data?.last_name}`}</h4>
        <div className='flex'>
          <div className='flex items-center'>
            <span className='mr-2 font-semibold'>{formatNumberFollow(data?.followers_count)}</span>
            <p>Follower</p>
          </div>
          <div className='ml-3 flex items-center'>
            <span className='mr-2 font-semibold'>{formatNumberLike(data?.likes_count)}</span>
            <p>Thích</p>
          </div>
        </div>
        <div className='mt-4 border border-transparent border-t-[#1618231f] pt-4 text-[14px] leading-5'>{data.bio}</div>
      </div>
    </>
  )
}
