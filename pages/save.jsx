export default function Save() {
    return (
        <div>
            Enter
        </div>
    );
}

export async function getServerSideProps(ctx){


    return {
        props:{
            data:null
        }
    }
}
