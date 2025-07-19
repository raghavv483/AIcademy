import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gray-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Squid 🐙</h1>
        <p className="max-w-md text-gray-300 text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              card: "shadow-lg p-6 rounded-xl",
              headerTitle: "text-xl font-bold",
              formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
            }
          }}
        />
      </div>
    </div>
  )
}
