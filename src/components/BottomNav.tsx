import React from 'react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  tasksBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  tasksBadgeCount = 2,
}) => {
  // Hide bottom nav in deep onboarding steps to match native stack screens
  const isOnboarding = currentScreen.startsWith('onboarding_');
  if (isOnboarding) return null;

  const tabs: { id: ScreenId; label: string; icon: string; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: 'grid_view' },
    { id: 'family', label: 'Family', icon: 'group' },
    { id: 'tasks', label: 'Tasks', icon: 'assignment_turned_in', badge: tasksBadgeCount },
    { id: 'payments', label: 'Payments', icon: 'sync_alt' },
    { id: 'insights', label: 'Insights', icon: 'pie_chart' },
  ];

  const getIsActive = (tabId: ScreenId) => {
    if (tabId === 'family') {
      return currentScreen === 'family' || currentScreen === 'child_luca' || currentScreen === 'spending_limits' || currentScreen === 'configure_app';
    }
    if (tabId === 'tasks') {
      return currentScreen === 'tasks' || currentScreen === 'approvals';
    }
    return currentScreen === tabId;
  };

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#e2e8f0]/80 shadow-[0_-2px_16px_rgba(11,42,74,0.06)]">
      <div className="flex justify-between items-center h-16 max-w-2xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = getIsActive(tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors relative ${
                isActive ? 'text-[#0b2a4a] font-semibold' : 'text-[#43474e] hover:text-[#0b2a4a]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.5 text-[9px] font-bold leading-none bg-[#fc6959] text-white rounded-full min-w-[14px] text-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
