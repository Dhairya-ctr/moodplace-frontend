import React from "react";
const MOODS = [
    { id: 'work-mode', label: 'Work Mode', emoji: '💻', color: 'bg-blue-100 border-blue-400' },
    { id: 'date-night', label: 'Date Night', emoji: '🌹', color: 'bg-pink-100 border-pink-400' },
    { id: 'quick-bite', label: 'Quick Bite', emoji: '🍔', color: 'bg-yellow-100 border-yellow-400' },
    { id: 'budget-food', label: 'Budget Food', emoji: '💰', color: 'bg-green-100 border-green-400' },
];

export default function MoodSelector({ selected, onSelect }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {MOODS.map(mood => (
                <button
                    key={mood.id}
                    onClick={() => onSelect(mood.id)}
                    className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer
            ${selected === mood.id ? mood.color + ' scale-105 shadow-lg' : 'bg-white border-gray-200 hover:shadow-md'}`}
                >
                    <span className="text-4xl mb-2">{mood.emoji}</span>
                    <span className="font-semibold text-gray-700">{mood.label}</span>
                </button>
            ))}
        </div>
    );
}