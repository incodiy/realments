<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script src="{{ asset('vendor/realments/js/realments.js') }}"></script>
<script>
    ReactDOM.render(
        React.createElement(Realments, window.realmentsData),
        document.getElementById('realmentsForm')
    );
</script>
