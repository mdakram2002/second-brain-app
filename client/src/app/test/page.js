export default function Test() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          PostCSS Fixed!
        </h1>
        <p className="text-gray-600">
          If you see purple styling, Tailwind is working!
        </p>
        <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Test Button
        </button>
      </div>
    </div>
  )
}