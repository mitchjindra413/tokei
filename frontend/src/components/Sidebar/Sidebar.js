import './Sidebar.css'

export const Sidebar = () => {

    return (
        <div className="sidebar-container">
            <div className="feed-div">
                <div className="feed-selector">
                    <i class="fa-solid fa-house fa-xl"></i>
                    <h2>For You</h2>
                </div>
                <div className="feed-selector">
                    <i class="fa-solid fa-user-group fa-xl"></i>
                    <h2>Following</h2>
                </div>
            </div>

            <div className="feed-div">
                <h4>Popular topics</h4>
                <div className="feed-selector">
                    <i class="fa-solid fa-face-laugh-beam fa-xl"></i>
                    <h2>Comedy</h2>
                </div>
                <div className="feed-selector">
                    <i class="fa-solid fa-compact-disc fa-xl"></i>
                    <h2>Dance</h2>
                </div>
                <div className="feed-selector">
                    <i class="fa-solid fa-gamepad fa-xl"></i>
                    <h2>Gaming</h2>
                </div>
            </div>

            <div className="feed-div">
                <h4>Following Accounts</h4>
            </div>
        </div>
    )
}