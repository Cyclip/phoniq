import "./errorPage.css";

// import mochi.png from assets
import Mochi from "../assets/mochi.png";

/**
 * The UI was designed by my girlfriend, so I'd like
 * to thank her for her help by including the mochi
 * she drew for me in the error page <3
 */

function ErrorPage(props) {
    return (
        <div className="errorPage">
            <img src={Mochi} alt="mochi" />
            <div className="text">
                <h1>Couldn't find the page you're looking for :(</h1>
                <p>It'd be useful if you could report this to the dev team. For now, head back to the search page.</p>
                <p className="error">Error: 404 (unknown page "{props.pageName}")</p>
            </div>
        </div>
    );
}

export default ErrorPage;