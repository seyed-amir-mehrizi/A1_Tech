import styles from './footer.module.css'
function Footer() {
    return (
        <footer className={`${styles.footerStyle} footer mt-auto py-3 border-top`}>
            <div className="container  text-center">
                <span className="text-black">© Test LAB Group 2018</span>
            </div>
        </footer>
    )
}

export default Footer