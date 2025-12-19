import React from 'react'
import { IoMdSad } from 'react-icons/io'
import { MdCloudOff } from 'react-icons/md'

function RegistroVazio() {
  return (
    <div className="hover:bg-transparent">
                      <div className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                          <MdCloudOff className="w-20 h-20 mb-4 opacity-50" />


                          <p className="text-sm font-medium">Nenhum registro encontrado</p>
                        </div>
                      </div>
                    </div>
  )
}

export default RegistroVazio