export {}

declare global {
	interface Window {
		clarity?: (action: string, value: boolean) => void
		_ja7_iframe_remove?: () => void
	}
}