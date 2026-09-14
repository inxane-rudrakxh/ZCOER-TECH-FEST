-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registration Campaigns
CREATE TABLE registration_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'OPEN', 'CLOSED', 'EXPIRED', 'DISABLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Games Reference Table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'COMING SOON', 'LIVE', 'PAUSED', 'CLOSED', 'COMPLETED', 'ENDED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Games Insert
INSERT INTO games (slug, name, description) VALUES
('quiz', 'TECHNICAL QUIZ', 'Rapid-fire multiple choice test.'),
('debug', 'CODE DEBUGGING', 'Live in-browser IDE sandbox.'),
('ai', 'AI / PROMPT CHALLENGE', 'Generative AI Prompt Clash.');

-- Registration Campaign Games (Many-to-Many)
CREATE TABLE registration_campaign_games (
    campaign_id UUID REFERENCES registration_campaigns(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    PRIMARY KEY (campaign_id, game_id)
);

-- Participants
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id TEXT UNIQUE NOT NULL, -- e.g. TGA-0248
    secure_token TEXT UNIQUE NOT NULL, -- URL access token
    full_name TEXT NOT NULL,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    roll_number TEXT,
    mobile_number TEXT,
    registered_via_campaign UUID REFERENCES registration_campaigns(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game Participants (Many-to-Many)
CREATE TABLE game_participants (
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    PRIMARY KEY (participant_id, game_id)
);

-- Quiz Tables
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id),
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 10,
    total_marks INTEGER,
    status TEXT DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    correct_option_id UUID, -- Set after options are inserted
    marks INTEGER DEFAULT 1,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE quiz_questions ADD CONSTRAINT fk_correct_option FOREIGN KEY (correct_option_id) REFERENCES quiz_options(id) ON DELETE SET NULL;

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    score NUMERIC(5,2),
    status TEXT DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'TIMEOUT')),
    UNIQUE(quiz_id, participant_id)
);

CREATE TABLE quiz_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES quiz_options(id) ON DELETE CASCADE,
    is_correct BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(attempt_id, question_id)
);

-- Debug Challenge Tables
CREATE TABLE debug_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id),
    title TEXT NOT NULL,
    description TEXT,
    language TEXT NOT NULL,
    initial_code TEXT,
    test_cases TEXT,
    time_limit_minutes INTEGER DEFAULT 20,
    max_score INTEGER DEFAULT 100,
    status TEXT DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE debug_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES debug_challenges(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    submitted_code TEXT NOT NULL,
    score NUMERIC(5,2),
    status TEXT DEFAULT 'SUBMITTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Challenge Tables
CREATE TABLE ai_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id),
    title TEXT NOT NULL,
    scenario_description TEXT NOT NULL,
    status TEXT DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ai_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES ai_challenges(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    prompt_used TEXT,
    image_url TEXT,
    video_url TEXT,
    score NUMERIC(5,2),
    feedback TEXT,
    status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'UNDER_EVALUATION', 'EVALUATED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(challenge_id, participant_id)
);

-- Overall Leaderboard View / Scores table
CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    score NUMERIC(5,2) NOT NULL,
    time_taken_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(participant_id, game_id)
);

-- RLS setup (stub for basic operations)
-- We will enable RLS and add basic permissive policies for now so frontend works,
-- but normally you would lock this down tight for players vs admins.
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read games" ON games FOR SELECT USING (true);
