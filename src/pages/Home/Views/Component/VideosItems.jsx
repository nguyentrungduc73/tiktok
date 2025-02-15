import React, { useEffect, useRef, useState } from 'react'
import { FormatTextBold } from '../../../../assets/FormatTextBoild'
import { ImgBasic } from '../../../../assets/img'
import {
  CommentIcon,
  Email,
  Heart,
  LikedHeart,
  LineIcon,
  LinkedIn,
  Pinterest,
  Reddit,
  Telegram
} from '../../../../Icons/Icons'
import ItemShare from '../../../components/itemShare/ItemShare'
import ShareMoreComponent from '../../../components/shareMore/ShareMoreComponent'
import { User } from '../../../../apis/UserAPI'
import { Link } from 'react-router-dom'
import { LikeAPI } from '../../../../apis/Like'
import ButtonPlayVideo from '../../../components/ControlVideo/ButtonPlayVideo'
import ButtonVolume from '../../../components/ControlVideo/ButtonVolume'
import ButtonChangeVolume from '../../../components/ControlVideo/ButtonChangeVolume'
import { useContext } from 'react'
import { AppContext } from '../../../../context/app.context'

function VideosItems({ data, totalData, previousPath }) {
  const { setIsPlaying } = useContext(AppContext)
  const ratio = data?.meta.video.resolution_x > data?.meta.video.resolution_y
  const videoRef = useRef()
  const [isFollowed, setIsFollowed] = useState(data?.user.is_followed)
  const [isLiked, setIsLiked] = useState(data?.is_liked)
  const [likesCount, setLikeCount] = useState(null)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    setIsFollowed(data?.user.is_followed)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data])

  const handleScroll = (e) => {
    setIsPlaying(true)
    const allVideos = document.querySelectorAll('.video-display')
    const revealSection = function (entries, observer) {
      const [entry] = entries
      if (entry.isIntersecting) {
        entry.target.play()
      } else {
        entry.target.pause()
      }
      observer.unobserve(entry.target)
    }
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.65
    })
    allVideos.forEach((item, index) => {
      sectionObserver.observe(item)
    })
  }
  const handleFollow = () => {
    User.followUser(data?.user_id).then((res) => {
      setIsFollowed(res.data.data.is_followed)
    })
  }
  const handleUnFollow = () => {
    User.unFollowUser(data?.user_id).then((res) => {
      setIsFollowed(res.data.data.is_followed)
    })
  }
  const handleLikeVideo = () => {
    LikeAPI.LikePost(data.id).then((res) => {
      setIsLiked(true)
      setLikeCount(res.data.data.likes_count)
    })
  }
  const handleUnlikeVideo = () => {
    LikeAPI.UnLikePost(data.id).then((res) => {
      setIsLiked(false)
      setLikeCount(res.data.data.likes_count)
    })
  }

  return (
    <div className='w-[710px] border-b py-4'>
      <div className='relative flex'>
        <Link
          to={`/users/@${data?.user.nickname}`}
          className='group mt-1 h-[56px] w-[56px] overflow-hidden rounded-full'
        >
          <img src={ImgBasic(data?.user.avatar)} alt='' className='h-full w-full object-cover' />
        </Link>
        <div className='ml-3 p-1'>
          <div className='flex items-center '>
            <Link
              to={`/users/@${data?.user.nickname}`}
              className='cursor-pointer text-[18px] font-black group-hover:underline hover:underline'
            >
              {data?.user.nickname}
            </Link>
            <div className='ml-2 text-[14px] font-extralight tracking-tighter'>
              {data?.user.last_name}
              {data?.user.first_name}
            </div>
            <div className='absolute top-1 right-0 mt-3 h-4'>
              <div className=''>
                {!isFollowed ? (
                  <button
                    className=' cursor-pointer rounded-[4px] border border-[rgba(254,44,85,1)] bg-white px-5 py-1 font-medium text-[#fe2c55] hover:bg-[#FFF2F5]'
                    type='button'
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className='cursor-pointer rounded-[4px] border border-[#1618231f] bg-[#fff] px-5 py-1 font-medium text-[#161823] hover:border-[#d0d1d3] hover:bg-[#f8f8f8]'
                    type='button'
                    onClick={handleUnFollow}
                  >
                    Following
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='w-[430px] text-base font-light leading-6 tracking-tighter line-clamp-3'>
            <FormatTextBold text={data?.description} /> 🎧
          </div>
          {data?.music ? <div className='mt-1 font-medium'>Nhạc Nền - {data?.music} 🎧🎧🎧</div> : null}
          <div className='relative mt-3 mb-3 flex w-fit'>
            <Link
              to={`/users/@${data?.user.nickname}/${data?.uuid}`}
              className={`div-video mr-2 ${
                ratio ? 'w-[calc(450px+((100vw-768px)/1152)*100)]' : 'h-[calc(450px+((100vw-768px)/1152)*100)]'
              } ${ratio ? 'h-fit' : 'w-fit'} `}
              state={{ totalData: totalData, previousPath: previousPath }}
            >
              <video
                className='video-display h-full w-full overflow-hidden rounded-lg  '
                muted={true}
                loop
                src={data?.file_url}
                ref={videoRef}
              />
            </Link>
            <div className='absolute left-4 bottom-6 flex w-full items-center justify-between pr-[90px]'>
              <div className=' '>
                <ButtonPlayVideo videoRef={videoRef} />
              </div>
              <div className='volumeBox'>
                <div className='volume1 '>
                  <ButtonVolume videoRef={videoRef} />
                </div>
                <ButtonChangeVolume
                  videoRef={videoRef}
                  style={'controlVolume absolute bottom-[70px] hidden right-[65px] rotate-[-90deg]'}
                />
              </div>
            </div>
            <div className='flex h-full flex-col items-center   gap-1 self-end'>
              <div className='flex flex-col items-center justify-center'>
                <span className='mr-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-[50%] bg-[#1618230f]'>
                  {!isLiked ? (
                    <div onClick={handleLikeVideo}>
                      <Heart style={{ width: '24px', height: '24px' }} />
                    </div>
                  ) : (
                    <div onClick={handleUnlikeVideo}>
                      <LikedHeart style={{ width: '24px', height: '24px' }} />
                    </div>
                  )}
                </span>
                <p className='text-center text-fontSizeMin leading-tight text-tiktokColorText'>
                  {likesCount || data.likes_count}.K
                </p>
              </div>
              <Link
                to={`/users/@${data?.user.nickname}/${data?.uuid}`}
                className='flex cursor-pointer flex-col items-center justify-center'
                state={{ totalData: totalData, previousPath: previousPath }}
              >
                <span className='flex h-12 w-12 items-center justify-center rounded-[50%] bg-[#1618230f]'>
                  <CommentIcon />
                </span>
                <p className='text-center text-fontSizeMin leading-tight text-tiktokColorText'>{data.comments_count}</p>
              </Link>
              <div className='flex flex-col items-center justify-center'>
                <div className='mr-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-[50%] bg-[#1618230f]'>
                  <div>
                    <ShareMoreComponent
                      data={[
                        <ItemShare icon={<LinkedIn />} nameIcon={'LinkedIn'} />,
                        <ItemShare icon={<Reddit />} nameIcon={'Reddit'} />,
                        <ItemShare icon={<Telegram />} nameIcon={'Telegram'} />,
                        <ItemShare icon={<Email />} nameIcon={'Email'} />,
                        <ItemShare icon={<LineIcon />} nameIcon={'LineIcon'} />,
                        <ItemShare icon={<Pinterest />} nameIcon={'Pinterest'} />
                      ]}
                      placement={'right'}
                    />
                  </div>
                </div>
                <span className='text-center text-fontSizeMin leading-tight text-tiktokColorText'>0.k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideosItems
