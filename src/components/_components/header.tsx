import GoogleLoginButton from "./google-login-button";

function Header() {
  return (
    <div className="p-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">VerryCheap</h1>
      <GoogleLoginButton />
    </div>
  );
}

export default Header;
