import React from 'react';

export const Link = ({ to, children, className, style, onClick, ...props }: any) => {
  return (
    <a 
      href={to} 
      className={className} 
      style={style} 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
};

export const NavLink = Link;

export const useNavigate = () => {
  return (path: string) => {
    console.log('Mock navigate to:', path);
  };
};

export const MemoryRouter = ({ children }: any) => <>{children}</>;

export const useLocation = () => {
  return { pathname: '/', search: '', hash: '', state: null };
};

export const useParams = () => {
  return {};
};
