import '../vjQuery';

test('Query', () => {
    const hostEl = document.createElement('div');
    hostEl.className = 'host';
    const mockDom = '<div class="first"></div><div class="second"></div><div class="third"></div><div class="fourth"></div><div class="fifth"></div>';
    hostEl.innerHTML = mockDom;

    $()
    expect(activity.id > 0).toBe(true);
    expect(activity.hourlyRate === 0).toBe(true);
    expect(activity.client).toEqual({});
    expect(activity.parentActivity).toEqual({});
    expect(activity.name).toBe('new activity');
    expect(activity.subactivities).toEqual([]);
    expect(activity.timeEntries).toEqual([]);
    expect(db.create).toBeCalled();
});