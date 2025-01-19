class DateHelper {
	static formatDate(date: Date) {
		return [
			date.getFullYear(),
			(date.getMonth() + 1).toString().padStart(2, "0"),
			date.getDate().toString().padStart(2, "0"),
		].join("-");
	}

	static formatTime(date: Date) {
		return [date.getHours(), date.getMinutes(), date.getSeconds()].join(
			":"
		);
	}

	static getYearMonth(date: Date) {
		return (
			date.getFullYear() +
			(date.getMonth() + 1).toString().padStart(2, "0")
		);
	}

	static getStartOfDay(date: Date) {
		const startDate = new Date(date);
		startDate.setUTCHours(0, 0, 0, 0);

		return startDate;
	}

	static getEndOfDay(date: Date) {
		const endDate = new Date(date);
		endDate.setUTCHours(23, 59, 59, 999);

		return endDate;
	}
}

export default DateHelper;
