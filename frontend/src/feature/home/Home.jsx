import React from 'react'
import IMG from '../../assets/images/sample-image.png'

import './home.css'

const data = [
  {
    id: 1,
    title: 'title',
    content: 'dfd',
  },
  {
    id: 2,
    title: 'title',
    content: 'sa',
  },
  {
    id: 3,
    title: 'title',
    content: 'saf',
  },
  {
    id: 4,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 5,
    title: 'title',
    content: 'dfd',
  },
  {
    id: 6,
    title: 'title',
    content: 'sa',
  },
  {
    id: 7,
    title: 'title',
    content: 'saf',
  },
  {
    id: 8,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 9,
    title: 'title',
    content: 'dfd',
  },
  {
    id: 10,
    title: 'title',
    content: 'sa',
  },
  {
    id: 11,
    title: 'title',
    content: 'saf',
  },
  {
    id: 12,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 13,
    title: 'title',
    content: 'sa',
  },
  {
    id: 14,
    title: 'title',
    content: 'saf',
  },
  {
    id: 15,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 16,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 17,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 18,
    title: 'title',
    content: 'asdf',
  },
  {
    id: 19,
    title: 'title',
    content: 'asdf',
  },
]
const Home = () => {
  return (
    <div className='conference__container'>
      <div className='conference__section'>
        {
          data.map(({ id, title, content }, index) => {
            return (
              <div className='conference__summary'>
                <input name='conferenceId' value={id} hidden />
                <img src={IMG} alt='test' className='sample_image' />
                <p>{title}</p>
                <p>{content}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home