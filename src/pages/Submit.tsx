const AuthPage = () => {
  return (
    <div className="min-h-screen min-w-screen container bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="container min-h-screen space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-2">Please log in or create an account to continue.</p>
        </div>

        {/* Forms */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Login Form */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Login</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Username</label>
                 <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                 <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Login
              </button>
              <div className="text-right">
                <a href="#" className="text-sm text-purple-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Create Account</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Username</label>
                 <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                 <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Create Account
              </button>
              <div className="text-right">
                <a href="#" className="text-sm text-purple-600 hover:underline">
                  <span className="font-medium">View Policy</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
