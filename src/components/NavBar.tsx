import './NavBar.scss'
import JamUserCirce from '../assets/icons/jam-user-circle.svg?react'
import SVGRepoBadmintonShuttlecock from '../assets/icons/svgrepo-badminton-shuttlecock.svg?react'
import { userStore, filterStore } from '../stores'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  let [username, setUsername] = userStore((state) => [state.username, state.setUsername])
  let [text, setText] = filterStore((state) => [state.text, state.setText])
  let location = useLocation()

  function handleSearchBarChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  return <nav>
    <Link to='/home'>
    <div className="logo">
      <SVGRepoBadmintonShuttlecock fill='white' height='1em' width='1em' />
      {/* <img src={SVGRepoBadmintonShuttlecock} style={{height:"1em"}}/> */}
      ShuttleCourt
    </div>
    </Link>
    {location.pathname != '/' &&
      <>
        <div className='search-bar'>
          <input type="text" placeholder="Search for a court" onChange={handleSearchBarChange} />
          <button>Filter</button>
        </div>
        <div className='user-menu'>
          <JamUserCirce fill='white' />
          {username}
        </div>
      </>
    }
  </nav>
}