import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <div>
      <img
        src={background}
        alt="background"
        className="h-screen w-screen bg-cover bg-center"
      />
    </div>
  );
}
