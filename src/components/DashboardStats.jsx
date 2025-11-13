import { Building2, FileText, TrendingUp } from 'lucide-react';

const DashboardStats = ({ properties, enquiries }) => {
  const enquiryCount = enquiries?.total ?? enquiries?.total ?? 0;
  const stats = [
    {
      label: 'Total Properties',
      value: properties.length,
      icon: Building2,
      color: '#2563eb',
      bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
    },
    {
      label: 'Total Enquiries',
      value: enquiryCount || 0,
      icon: FileText,
      color: '#dc2626',
      bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
    },
    {
      label: 'Active Listings',
      value: properties.filter(p => p.status === 'active').length,
      icon: TrendingUp,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }
  ];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const cardStyle = (index) => ({
    background: 'white',
    borderRadius: '1rem',
    padding: '1.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    animation: `scaleUp 0.5s ease-out ${0.1 * (index + 1)}s backwards`,
    cursor: 'pointer'
  });

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)'
  };

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  const cardLeftStyle = {
    flex: 1
  };

  const cardTitleStyle = {
    color: '#6b7280',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '0.5rem'
  };

  const cardValueStyle = {
    fontSize: '2.25rem',
    fontWeight: 900,
    color: '#111827',
    marginBottom: '0.5rem'
  };

  const iconContainerStyle = (bgGradient) => ({
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    background: bgGradient,
    animation: 'pulse 3s ease-in-out infinite'
  });

  const changeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#10b981'
  };

  return (
    <>
      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
      
      <div style={gridStyle}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              style={cardStyle(idx)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={cardHeaderStyle}>
                <div style={cardLeftStyle}>
                  <p style={cardTitleStyle}>{stat.label}</p>
                  <p style={cardValueStyle}>{stat.value}</p>
                  <div style={changeStyle}>
                    <span>↑</span>
                    <span>+12.5% from last month</span>
                  </div>
                </div>
                <div style={iconContainerStyle(stat.bgGradient)}>
                  <Icon style={{ width: '1.5rem', height: '1.5rem', color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DashboardStats;