'use client';

import { useState } from 'react';
import { Menu } from 'bloom-menu';

export default function Bloom() {
  const [expandDirection, setExpandDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('left');
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end'>('center');
  const [menuWidth, setMenuWidth] = useState(160);
  const [menuRadius, setMenuRadius] = useState(12);
  const [triggerType, setTriggerType] = useState<'icon' | 'text'>('icon');

  const updateExpandDirection = (newDirection: 'top' | 'bottom' | 'left' | 'right') => {
    setExpandDirection(newDirection);
    if (newDirection === 'left' || newDirection === 'right') {
      setAlignment('center');
    }
  };

  const menuItemStyles = "flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100";

  return (
    <div className="w-full flex flex-col items-center gap-24 sm:gap-48 min-h-[400px] pt-8 sm:pt-24 pb-8">
      <div className="flex items-center justify-center">
        <Menu.Root direction={expandDirection} anchor={alignment}>
          <Menu.Container
            buttonSize={triggerType === 'text' ? { width: 100, height: 40 } : 40}
            menuWidth={menuWidth}
            menuRadius={menuRadius}
            className="bg-white shadow-lg ring-1 ring-black/5"
          >
            <Menu.Trigger>
              {triggerType === 'text' ? (
                <div className="flex items-center justify-center w-full h-full rounded-full bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-700">Menu</span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
              )}
            </Menu.Trigger>
            <Menu.Content className="p-2">
              <Menu.Item className={menuItemStyles} onSelect={() => {}}>
                <svg 
                  data-testid="geist-icon" 
                  height="16" 
                  strokeLinejoin="round" 
                  viewBox="0 0 16 16" 
                  width="16" 
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z" 
                    fill="#A3A3A3"
                  />
                </svg>
                Edit
              </Menu.Item>
              <Menu.Item className={menuItemStyles} onSelect={() => {}}>
                <svg 
                  data-testid="geist-icon" 
                  height="16" 
                  strokeLinejoin="round" 
                  viewBox="0 0 16 16" 
                  width="16" 
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" 
                    fill="#A3A3A3"
                  />
                </svg>
                Copy
              </Menu.Item>
              <Menu.Item className={menuItemStyles} onSelect={() => {}}>
                <svg 
                  data-testid="geist-icon" 
                  height="16" 
                  strokeLinejoin="round" 
                  viewBox="0 0 16 16" 
                  width="16" 
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M7.29289 1.39644C7.68342 1.00592 8.31658 1.00592 8.70711 1.39644L11.7803 4.46966L12.3107 4.99999L11.25 6.06065L10.7197 5.53032L8.75 3.56065V10.25V11H7.25V10.25V3.56065L5.28033 5.53032L4.75 6.06065L3.68934 4.99999L4.21967 4.46966L7.29289 1.39644ZM13.5 9.24999V13.5H2.5V9.24999V8.49999H1V9.24999V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.24999V8.49999H13.5V9.24999Z" 
                    fill="#A3A3A3"
                  />
                </svg>
                Share
              </Menu.Item>
              <Menu.Item className={menuItemStyles} onSelect={() => {}}>
                <svg 
                  data-testid="geist-icon" 
                  height="16" 
                  strokeLinejoin="round" 
                  viewBox="0 0 16 16" 
                  width="16" 
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M1.5 3.5H14.5V5.5H13.5H2.5H1.5V3.5ZM1 7H0V5.5V3.5V2H1.5H14.5H16V3.5V5.5V7H15V12.5C15 13.8807 13.8807 15 12.5 15H3.5C2.11929 15 1 13.8807 1 12.5V7ZM2.5 7V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7H2.5ZM6 9.5H6.75H9.25H10V11H9.25H6.75H6V9.5Z" 
                    fill="#A3A3A3"
                  />
                </svg>
                Archive
              </Menu.Item>
            </Menu.Content>
          </Menu.Container>
        </Menu.Root>
      </div>

      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <div className="relative flex items-center gap-1 rounded-[24px] p-1" style={{ backgroundColor: '#E8E8E8' }}>
            <div 
              className="absolute w-8 h-8 bg-white rounded-full shadow-sm transition-transform duration-200 ease-out"
              style={{
                transform: (() => {
                  const positions = { top: 0, bottom: 1, left: 2, right: 3 };
                  const position = positions[expandDirection];
                  return `translateX(calc(${position * 100}% + ${position * 4}px))`;
                })(),
              }}
            />
            
            <button
              onClick={() => updateExpandDirection('top')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16"
                className={expandDirection === 'top' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Expand Up
              </span>
            </button>
            
            <button
              onClick={() => updateExpandDirection('bottom')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16"
                className={expandDirection === 'bottom' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M8.70711 14.6036C8.31659 14.9941 7.68342 14.9941 7.2929 14.6036L2.21968 9.53034L1.68935 9.00001L2.75001 7.93935L3.28034 8.46968L7.25001 12.4394V1.75V1H8.75001V1.75V12.4394L12.7197 8.46968L13.25 7.93935L14.3107 9.00001L13.7803 9.53034L8.70711 14.6036Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Expand Down
              </span>
            </button>
            
            <button
              onClick={() => updateExpandDirection('left')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16"
                className={expandDirection === 'left' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Expand Left
              </span>
            </button>
            
            <button
              onClick={() => updateExpandDirection('right')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16"
                className={expandDirection === 'right' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M14.6036 7.2929C14.9941 7.68342 14.9941 8.31659 14.6036 8.70711L9.53034 13.7803L9.00001 14.3107L7.93935 13.25L8.46968 12.7197L12.4394 8.75001H1.75H1V7.25001H1.75H12.4394L8.46968 3.28034L7.93935 2.75001L9.00001 1.68935L9.53034 2.21968L14.6036 7.2929Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Expand Right
              </span>
            </button>
          </div>

          <div className="relative flex items-center gap-1 rounded-[24px] p-1" style={{ backgroundColor: '#E8E8E8' }}>
            <div 
              className="absolute w-8 h-8 bg-white rounded-full shadow-sm transition-transform duration-200 ease-out"
              style={{
                transform: (() => {
                  const positions = { start: 0, center: 1, end: 2 };
                  const position = positions[alignment];
                  return `translateX(calc(${position * 100}% + ${position * 4}px))`;
                })(),
              }}
            />
            
            <button
              onClick={() => setAlignment('start')}
              disabled={expandDirection === 'left' || expandDirection === 'right'}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group ${
                expandDirection === 'left' || expandDirection === 'right' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16" 
                className={alignment === 'start' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Align Start
              </span>
            </button>
            <button
              onClick={() => setAlignment('center')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16" 
                className={alignment === 'center' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM3.5 7.25H4.25H11.75H12.5V8.75H11.75H4.25H3.5V7.25ZM2.5 12.5H3.25H12.75H13.5V14H12.75H3.25H2.5V12.5Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Align Center
              </span>
            </button>
            <button
              onClick={() => setAlignment('end')}
              disabled={expandDirection === 'left' || expandDirection === 'right'}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group ${
                expandDirection === 'left' || expandDirection === 'right' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <svg 
                data-testid="geist-icon" 
                height="16" 
                strokeLinejoin="round" 
                viewBox="0 0 16 16" 
                width="16" 
                className={alignment === 'end' ? 'text-gray-900' : 'text-gray-400'}
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM6 7.25H6.75H14.25H15V8.75H14.25H6.75H6V7.25ZM4 12.5H4.75H14.25H15V14H14.25H4.75H4V12.5Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Align End
              </span>
            </button>
          </div>

          <div className="relative flex items-center gap-1 rounded-[24px] p-1" style={{ backgroundColor: '#E8E8E8' }}>
            <div 
              className="absolute w-8 h-8 bg-white rounded-full shadow-sm transition-transform duration-200 ease-out"
              style={{
                transform: triggerType === 'text' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
              }}
            />
            
            <button
              onClick={() => setTriggerType('icon')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={triggerType === 'icon' ? 'text-gray-900' : 'text-gray-400'}>
                <circle cx="8" cy="4" r="1.25" fill="currentColor"/>
                <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
                <circle cx="8" cy="12" r="1.25" fill="currentColor"/>
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Icon Only
              </span>
            </button>
            
            <button
              onClick={() => setTriggerType('text')}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors group cursor-pointer"
            >
              <span className={`text-xs font-medium ${triggerType === 'text' ? 'text-gray-900' : 'text-gray-400'}`}>Aa</span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Icon + Text
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

