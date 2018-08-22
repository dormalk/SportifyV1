import React from 'react';
import { 
    isPartOfHobbie,
    isHobbie
} from '../../selectors/HobbiesSuggestion';


test('isPartOfHobbie should work correctly', () => {
    var value = 'כדורג';
    var result = isPartOfHobbie(value);
    expect(result).toBe(true);

    value = 'גחדלכחג';
    result = isPartOfHobbie(value);
    expect(result).toBe(false);

});


test('isHobbie should work correctly', () => {
    var value = 'כדורסל';
    var result = isPartOfHobbie(value);
    expect(result).toBe(true);

    value = 'גחדלכחג';
    result = isPartOfHobbie(value);
    expect(result).toBe(false);
});
