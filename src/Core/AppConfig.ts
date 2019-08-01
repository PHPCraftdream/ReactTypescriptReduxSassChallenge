export class AppConfig {
    public static isMocksEnabled(): boolean {
        return true;
    }

    public static mockTimeout(): number {
        return 1000;
    }
}
