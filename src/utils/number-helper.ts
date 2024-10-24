class NumberHelper {
	static formatNumber(value: number) {
		if (Number.isNaN(value)) {
			return "";
		}

		return value.toLocaleString("id-ID");
	}
}

export default NumberHelper;
