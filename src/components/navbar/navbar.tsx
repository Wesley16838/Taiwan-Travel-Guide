import Links from '../links/links'

const Navbar = () => {
    return(
        <div className="container">
            <div></div>
            <div>
                <Links name="台灣景點" path="/"/>
                <Links name="美食住宿" path="/"/>
                <Links name="景點交通" path="/"/>
            </div>
        </div>
    )
}

export default Navbar;