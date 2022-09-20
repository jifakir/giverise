import Avatar from 'antd/lib/avatar/avatar';
import type { NextPage } from 'next'
import { ReactNode } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { HiBadgeCheck } from 'react-icons/hi';
import { FiBarChart2, FiShare, FiUsers } from 'react-icons/fi';
import { HeaderMenu, SidebarLeft } from '../components';
import { MapMarker } from '../components/icons';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';


export const TagButton = ({ text, icon }: { text: string, icon?: ReactNode }) => (
  <button className='h-[26px] rounded-full px-2 inline-flex bg-primary-purple bg-opacity-5 items-center text-xs text-secondary'>
    <span className='mr-2'>
      {icon}
    </span>
    {text}
  </button>
);

export const AwardPost = ({ isAwarded = false, image = "" }) => {

  return (
    <div className="bg-white rounded-lg w-full mb-5 p-5">
      {isAwarded ? (
        <div className="flex items-center">
          <div className='w-[7px] h-[7px] rounded-full bg-primary-orange' />
          <p className='text-primary-orange text-xs font-normal ml-1'>Awarded</p>
          <p className='ml-4 text-secondary text-xs'>Deadline: Aug 1, 2022 </p>
        </div>
      ) : (
        <div className="flex items-center">
          <div className='w-[7px] h-[7px] rounded-full bg-primary-green' />
          <p className='text-primary-green text-xs font-normal ml-1'>Open</p>
          <p className='ml-4 text-secondary text-xs'>Deadline: Aug 1, 2022 </p>
        </div>
      )}


      <div className="flex items-center mt-4">
        <Avatar size={32} src="/images/dummy/profile.jpg" />
        <div className='ml-2'>
          <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
            selenaofficial
            <span className='ml-2 text-primary-purple'>
              <HiBadgeCheck />
            </span>
          </h3>
        </div>
        <div className="ml-auto">
          <p className='text-secondary font-normal text-xs'>Awarding</p>
          <h3 className='text-primary-green text-xl font-bold'>
            $5, 000
          </h3>
        </div>
      </div>

      <div className="my-5">
        <h2 className='text-primary text-base font-semibold'>Paying for 30 students in primary schools across India</h2>
        <p className='text-body text-sm font-normal my-4'>
          Stacked Marketer is a free 7-minute daily newsletter that filters through the noise that fills the marketing world.
          <a href="#" className='font-semibold'>Read more</a>
        </p>
        <img src={image} alt="post_1" className='max-w-full w-full rounded-lg h-[213px] object-cover' />
      </div>
      <div className="flex items-center gap-4 -mx-4 px-4 pb-4 border-b border-[#F1F1F5] smMax:flex-wrap smMax:gap-y-2">
        <TagButton text='Nairobi, Kenya' icon={<MapMarker />} />
        <TagButton text='Undergraduate' icon={<FiBarChart2 />} />
        <TagButton text='4 Winners' icon={<FiUsers />} />
      </div>

      <div className="pt-5 flex items-center justify-between">
        <div className='flex items-center gap-5'>
          <button className='text-xl text-primary hover:text-primary-purple'>
            <FiShare />
          </button>
          <button className='text-xl text-primary hover:text-error'>
            <FaRegHeart />
          </button>
        </div>

        <div className='flex items-center gap-5 smMax:gap-2'>
          <button className='inline-flex items-center px-4 h-9 rounded-[4px] border-2 border-[#EDF2F7] text-base font-medium text-primary xs:px-3'>
            Contribute
          </button>
          <Link href="/awards/1">
            <a className='inline-flex items-center px-6 h-9 rounded-[4px] bg-primary-purple text-white hover:text-white text-base font-medium xs:px-3'>
              Apply
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const FeedInspiration = () => {
  return (
    <div className="bg-white rounded-lg w-full mb-5">
      <div className="border-b border-[#F1F1F5] p-4">
        <h3 className='text-sm font-medium text-primary'>Fund something</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center">
          <Avatar size={32} src="/images/dummy/profile.jpg" />
          <h3 className='text-sm font-normal text-body ml-4'>What award are you funding today? </h3>
        </div>
        <div className='bg-[#FAFBFC] rounded-lg px-4 flex items-center justify-between h-12 mt-4 smMax:overflow-x-auto snap-x snap-mandatory'>
          <a href="#" className='inline-flex items-center text-xs text-primary-purple font-normal hover:text-primary-purple smMax:min-w-max snap-start'>
            <span className='mr-2'><AiOutlineRise /></span>
            Giveback to your home country
          </a>
          <a href="#" className='inline-flex items-center text-xs text-primary-purple font-normal hover:text-primary-purple smMax:min-w-max snap-start'>
            <span className='mr-2'><AiOutlineRise /></span>
            Create scholarship
          </a>
          <a href="#" className='inline-flex items-center text-xs text-primary-purple font-normal hover:text-primary-purple smMax:min-w-max snap-start'>
            <span className='mr-2'><AiOutlineRise /></span>
            Giveaway to my fans
          </a>
        </div>
      </div>
    </div>
  );
}
const HomePage: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_CAMPAING_URL)
  return (
    <>
      <HeaderMenu />
      <div className='container py-5'>
        <div className='xl:max-w-[944px] flex xl:gap-x-28 lg:gap-x-16 lg:ml-[5%] xl:ml-[10%] mdMax:items-start'>
          <SidebarLeft />
          <div className="w-[592px] mdMax:mx-auto smMax:w-full smMax:px-4">
            <FeedInspiration />
            <AwardPost isAwarded={true} image="/images/dummy/post_1.jpg" />
            <AwardPost image="/images/dummy/post_2.jpg" />
            <AwardPost image="/images/dummy/post_3.jpg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
