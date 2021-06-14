import styles from "styles/common/header.module.scss";

const Header = () => {
  return (
    <header className={`${styles["header-wrapper"]} text-center`}>
      <h1 className="text-monospace text-white font-weight-bold">
        Hackerslatter
      </h1>
    </header>
  );
};

export default Header;
