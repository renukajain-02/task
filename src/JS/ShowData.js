const ShowData = (props) => {
    return(
        <>
            <div className="container m-5">
                <h2>Details of Selected User</h2>
                <div className="card card-design">
                    <div className="card-body ">
                        <h2 className="card-title">{props.selected.id}</h2>
                        <h3 className="card-title">{props.selected.name}</h3>
                        <p className="card-text">{props.selected.address}</p>
                    </div>
                </div>   
            </div> 
        </>
    );
}

export default ShowData