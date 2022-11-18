import { convertedDateService } from "../../../services/util/convertedDate.service";

//Teste unitário
describe("ConvertedDate", () => {

    test("Checks if the date is being converted", () => {
        const startDate = "2022-11-18";
        const endDate = "2022-12-18"

        const dateConverted = convertedDateService(startDate, endDate);

        const {startDateConverted, endDateConverted} = dateConverted;

        expect(dateConverted).toHaveProperty("startDateConverted");
        expect(dateConverted).toHaveProperty("endDateConverted");
        expect(startDateConverted).toBeInstanceOf(Date);
        expect(endDateConverted).toBeInstanceOf(Date);
        expect(startDateConverted.getUTCHours()).toEqual(0);
        expect(startDateConverted.getUTCMinutes()).toEqual(0);
        expect(startDateConverted.getUTCSeconds()).toEqual(0);
        expect(startDateConverted.getUTCMilliseconds()).toEqual(0);
        expect(endDateConverted.getUTCHours()).toEqual(23);
        expect(endDateConverted.getUTCMinutes()).toEqual(59);
        expect(endDateConverted.getUTCSeconds()).toEqual(59);
        expect(endDateConverted.getUTCMilliseconds()).toEqual(999);

    });

});