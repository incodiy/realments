<!-- Load React and ReactDOM -->
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

<!-- Load the compiled realments.js -->
<script src="{{ asset('vendor/realments/js/realments.js') }}"></script>

<!-- React render container -->
<div id="realmentsForm"></div>

<script>
    ReactDOM.render(
        React.createElement(Realments, window.realmentsData || {}),
        document.getElementById('realmentsForm')
    );
</script>
