export default function PlaceCard({ place }) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img
                src={place.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={place.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{place.name}</h3>
                    <span className="text-yellow-500 font-semibold">★ {place.rating?.toFixed(1)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{place.area}</p>
                <div className="flex flex-wrap gap-1">
                    {place.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}