CREATE FUNCTION get_next_track (current_track_id int) RETURNS int AS $$
DECLARE
    next_track_id int;

BEGIN
    SELECT
        id INTO next_track_id
    FROM
        track
    WHERE
        album_id = (
            SELECT
                album_id
            FROM
                track
            WHERE
                id = current_track_id
        )
        AND position_index > (
            SELECT
                position_index
            FROM
                track
            WHERE
                id = current_track_id
        )
    ORDER BY
        position_index ASC
    LIMIT
        1;

RETURN next_track_id;

END;

$$ LANGUAGE plpgsql;