"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface JobCategoryProps {
  id: string;
  icon: string;
  title: string;
  bgColor: string;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

export default function JobCategory({ id, icon, title, bgColor, isExpanded = false, children }: JobCategoryProps) {
  const [expanded, setExpanded] = useState(isExpanded)

  return (
    <div id={id} className="mb-3 scroll-mt-4">
      <div
        className={`${bgColor} p-4 rounded-xl border border-amber-200 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center text-xl shadow-sm">
            {icon}
          </div>
          <div className="font-medium text-gray-800">{title}</div>
        </div>
        <div className="text-gray-600 hover:text-gray-900 transition-colors">
          {expanded ? 
            <ChevronDown className="h-5 w-5 transition-transform duration-300" /> : 
            <ChevronRight className="h-5 w-5 transition-transform duration-300" />
          }
        </div>
      </div>

      <div 
        className={`transition-all duration-300 overflow-hidden ${
          expanded ? 'max-h-[80vh] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="overflow-y-auto max-h-[80vh] pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#D1D5DB #F3F4F6'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

