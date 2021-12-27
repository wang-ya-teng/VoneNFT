import './index.scss';
import logo from 'Assets/logo.png';

export default function IconLoading() {
  return (
    <div className='box-loading center'>
      <img className='mochi-loading bounce-4' src={logo} alt='logo' />
    </div>
  );
}
