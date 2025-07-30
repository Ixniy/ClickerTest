const tg = window.Telegram.WebApp;

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

    const onClosing = (callback) => {
        tg.onEvent('viewportChanged', (e) => {
            if (e.is_state_stable === false) {
                callback()
            }
        });

        window.addEventListener('beforeunload', callback);
        return () => {
            tg.offEvent('viewportChanged');
            window.removeEventListener('beforeunload', callback);
        }
    }

    return {
        onClose,
        onClosing,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }

}