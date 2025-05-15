{{-- resources/views/vendor/realments/scripts.blade.php --}}
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="{{ asset('vendor/realments/js/realments.js') }}"></script>

<script>
    window.realmentsData = {!! json_encode(session()->pull('realmentsData', [])) !!};

    document.addEventListener('DOMContentLoaded', function () {
        if (window.realmentsData && window.React && window.ReactDOM && window.Realments) {
            Object.entries(window.realmentsData).forEach(([id, data]) => {
                const container = document.getElementById(id);
                if (container) {
                    const root = ReactDOM.createRoot(container);
                    root.render(React.createElement(Realments, data));
                }
            });
        }
    });
</script>
