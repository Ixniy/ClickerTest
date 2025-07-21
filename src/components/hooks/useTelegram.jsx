const tg = window.Telegram.WebApp;
const apiUrl = 'https://ominous-palm-tree-44g65ww4pwx27pxx-8000.app.github.dev/api/users/';

export function useTelegram() {

    const onClose = () => {
        tg.close();
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) { 
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        apiUrl,
        user: tg.initDataUnsafe?.user,
    }

}