import React from 'react';
import ReactDOM from 'react-dom/client';
import Realments from './Realments';

// Ekspos komponen Realments ke window agar bisa dipanggil di Blade langsung
if (typeof window !== 'undefined') {
    window.Realments = Realments;
    window.React = React;
    window.ReactDOM = ReactDOM;
}

// **Optional**: auto render jika container dan data tersedia
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('realmentsForm');
    if (container && window.realmentsData) {
        // React 18+ pakai createRoot
        const root = ReactDOM.createRoot(container);
        root.render(<Realments {...window.realmentsData} />);
    }
});

export default Realments;
