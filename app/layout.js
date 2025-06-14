import './globals.css';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'Instagram Message Viewer',
  description: 'View and manage Instagram messages with ad referrals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
} 