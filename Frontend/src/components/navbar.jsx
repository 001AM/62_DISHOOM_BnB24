import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../context/Context';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import logo1 from "../assets/Logo1.png"
import profile_img from "../assets/profile.svg"
import axiosInstance from '../axios';
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/allproducts', current: false },
  { name: 'Scan', href: '/scan', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [currentItem, setCurrentItem] = useState(navigation.find(item => item.current)?.name || '')
  
  const navigate = useNavigate()
  const {setLogin, isLogin}= useContext(ExampleContext)
  const handleItemClick = (name) => {
    setCurrentItem(name)
  }
  const handleLogout = () => {
    if(isLogin){
      axiosInstance.post('/authentication/logout/', {
        refresh_token: localStorage.getItem('refresh_token'),
      })
      .then((res) => {
        // console.log(res.data)
      })
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      setLogin(false)
      navigate('/login');
    } else {
      navigate('/login')
    }
     
  }

  return (
    <>
    <style>
      {`
        @media (max-width: 640px) {
          .logo {
            margin-left: 3rem;
          }
        }
      `}
    </style>
    <Disclosure as="nav" className="bg-amber-950">
      {({ open }) => (
        <>
          <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-19">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-00 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1" style={{height:'70px'}}>
                <div className="flex items-center flex-shrink-0 md:ms-5">
                  <Link to="/" className="logo"><img className="w-auto h-8" src={logo1} alt="Your Company" /></Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex mt-4 space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleItemClick(item.name)}
                        className={classNames(
                          item.name === currentItem ? 'bg-orange-900 text-white' : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={profile_img}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item onClick={handleLogout}>
                        {({ active }) => (
                          <Link 
                            to="/login"
                            
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {isLogin ? `Sign out` :`Login`}
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden ">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => handleItemClick(item.name)}
                  className={classNames(
                    item.name === currentItem ? 'bg-orange-900 text-white' : 'text-gray-300 hover:bg-orange-900 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </>
  )
}
