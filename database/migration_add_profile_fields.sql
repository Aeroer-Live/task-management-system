-- Migration: Add profile fields to users table
-- Add bio, location, website fields to users table

ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN location TEXT;
ALTER TABLE users ADD COLUMN website TEXT;
