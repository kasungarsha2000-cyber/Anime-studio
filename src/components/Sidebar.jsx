import { Sparkles, UserCircle, LineChart, Film, PenTool, LayoutDashboard, Settings as SettingsIcon, History } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'viral-post', label: 'Viral Post', icon: <Sparkles size={20} /> },
    { id: 'character', label: 'Character Arch.', icon: <UserCircle size={20} /> },
    { id: 'infographic', label: 'Infographics', icon: <LineChart size={20} /> },
    { id: 'story', label: 'Story Video', icon: <Film size={20} /> },
    { id: 'art', label: 'Pencil Art', icon: <PenTool size={20} /> },
  ];

  const bottomItems = [
    { id: 'history', label: 'History', icon: <History size={20} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ];

  const NavItem = ({ item }) => (
    <button
      onClick={() => setActiveTab(item.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        padding: '0.75rem 1rem',
        backgroundColor: activeTab === item.id ? 'var(--bg-card-hover)' : 'transparent',
        color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
        border: 'none',
        borderRadius: 'var(--border-radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        fontWeight: activeTab === item.id ? '600' : '400',
        marginBottom: '0.5rem'
      }}
      onMouseEnter={(e) => {
        if (activeTab !== item.id) {
          e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (activeTab !== item.id) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }
      }}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  );

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: 'var(--bg-primary)', 
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
        <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)', color: 'white', display: 'flex' }}>
          <LayoutDashboard size={24} />
        </div>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Anime Content<br/>Studio</h1>
      </div>

      <div style={{ flex: 1, paddingRight: '0.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>Generators</h3>
        <nav>
          {menuItems.map(item => <NavItem key={item.id} item={item} />)}
        </nav>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', paddingRight: '0.5rem' }}>
        <nav>
          {bottomItems.map(item => <NavItem key={item.id} item={item} />)}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
