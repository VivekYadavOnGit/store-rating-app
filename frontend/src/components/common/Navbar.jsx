function Navbar() {
    return (
      <nav style={{ padding: "10px", background: "#eee" }}>
        <div className="flex items-center gap-2">
  <img
    src={RatingLogo}
    alt="RateHub Logo"
    className="w-8 h-8"
  />
  <h1 className="text-xl font-bold text-indigo-600 tracking-wide">
    RateHub
  </h1>
</div>
      </nav>
    )
  }
  
  export default Navbar